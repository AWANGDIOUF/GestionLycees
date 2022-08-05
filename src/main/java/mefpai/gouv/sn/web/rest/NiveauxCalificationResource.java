package mefpai.gouv.sn.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import mefpai.gouv.sn.domain.NiveauxCalification;
import mefpai.gouv.sn.repository.NiveauxCalificationRepository;
import mefpai.gouv.sn.security.SecurityUtils;
import mefpai.gouv.sn.service.NiveauxCalificationService;
import mefpai.gouv.sn.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
// import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link mefpai.gouv.sn.domain.NiveauxCalification}.
 */
@RestController
@RequestMapping("/api")
public class NiveauxCalificationResource {

    private final Logger log = LoggerFactory.getLogger(NiveauxCalificationResource.class);

    private static final String ENTITY_NAME = "niveauxCalification";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NiveauxCalificationService niveauxCalificationService;

    private final NiveauxCalificationRepository niveauxCalificationRepository;

    public NiveauxCalificationResource(
        NiveauxCalificationService niveauxCalificationService,
        NiveauxCalificationRepository niveauxCalificationRepository
    ) {
        this.niveauxCalificationService = niveauxCalificationService;
        this.niveauxCalificationRepository = niveauxCalificationRepository;
    }

    /**
     * {@code POST  /niveaux-califications} : Create a new niveauxCalification.
     *
     * @param niveauxCalification the niveauxCalification to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new niveauxCalification, or with status {@code 400 (Bad Request)} if the niveauxCalification has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/niveaux-califications")
    public ResponseEntity<NiveauxCalification> createNiveauxCalification(@Valid @RequestBody NiveauxCalification niveauxCalification)
        throws URISyntaxException {
        log.debug("REST request to save NiveauxCalification : {}", niveauxCalification);
        if (niveauxCalification.getId() != null) {
            throw new BadRequestAlertException("A new niveauxCalification cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NiveauxCalification result = niveauxCalificationService.save(niveauxCalification);
        return ResponseEntity
            .created(new URI("/api/niveaux-califications/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /niveaux-califications/:id} : Updates an existing niveauxCalification.
     *
     * @param id the id of the niveauxCalification to save.
     * @param niveauxCalification the niveauxCalification to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated niveauxCalification,
     * or with status {@code 400 (Bad Request)} if the niveauxCalification is not valid,
     * or with status {@code 500 (Internal Server Error)} if the niveauxCalification couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/niveaux-califications/{id}")
    public ResponseEntity<NiveauxCalification> updateNiveauxCalification(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody NiveauxCalification niveauxCalification
    ) throws URISyntaxException {
        log.debug("REST request to update NiveauxCalification : {}, {}", id, niveauxCalification);
        if (niveauxCalification.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, niveauxCalification.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!niveauxCalificationRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        NiveauxCalification result = niveauxCalificationService.save(niveauxCalification);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, niveauxCalification.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /niveaux-califications/:id} : Partial updates given fields of an existing niveauxCalification, field will ignore if it is null
     *
     * @param id the id of the niveauxCalification to save.
     * @param niveauxCalification the niveauxCalification to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated niveauxCalification,
     * or with status {@code 400 (Bad Request)} if the niveauxCalification is not valid,
     * or with status {@code 404 (Not Found)} if the niveauxCalification is not found,
     * or with status {@code 500 (Internal Server Error)} if the niveauxCalification couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/niveaux-califications/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<NiveauxCalification> partialUpdateNiveauxCalification(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody NiveauxCalification niveauxCalification
    ) throws URISyntaxException {
        log.debug("REST request to partial update NiveauxCalification partially : {}, {}", id, niveauxCalification);
        if (niveauxCalification.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, niveauxCalification.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!niveauxCalificationRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<NiveauxCalification> result = niveauxCalificationService.partialUpdate(niveauxCalification);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, niveauxCalification.getId().toString())
        );
    }

    /**
     * {@code GET  /niveaux-califications} : get all the niveauxCalifications.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of niveauxCalifications in body.
     */
    @GetMapping("/niveaux-califications")
    public ResponseEntity<List<NiveauxCalification>> getAllNiveauxCalifications(Pageable pageable) {
        log.debug("REST request to get a page of NiveauxCalifications");
        if (SecurityUtils.hasCurrentUserThisAuthority("ROLE_ADMIN")) {
            Page<NiveauxCalification> page = niveauxCalificationService.findAll(pageable);
            HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
            return ResponseEntity.ok().headers(headers).body(page.getContent());
        }
        return ResponseEntity
            .ok()
            .headers(
                PaginationUtil.generatePaginationHttpHeaders(
                    ServletUriComponentsBuilder.fromCurrentRequest(),
                    (niveauxCalificationService.findByUserIsCurrentUser(pageable))
                )
            )
            .body((niveauxCalificationRepository.findByUserIsCurrentUser(pageable)).getContent());
    }

    /**
     * {@code GET  /niveaux-califications/:id} : get the "id" niveauxCalification.
     *
     * @param id the id of the niveauxCalification to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the niveauxCalification, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/niveaux-califications/{id}")
    public ResponseEntity<NiveauxCalification> getNiveauxCalification(@PathVariable Long id) {
        log.debug("REST request to get NiveauxCalification : {}", id);
        Optional<NiveauxCalification> niveauxCalification = niveauxCalificationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(niveauxCalification);
    }

    /**
     * {@code DELETE  /niveaux-califications/:id} : delete the "id" niveauxCalification.
     *
     * @param id the id of the niveauxCalification to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/niveaux-califications/{id}")
    public ResponseEntity<Void> deleteNiveauxCalification(@PathVariable Long id) {
        log.debug("REST request to delete NiveauxCalification : {}", id);
        niveauxCalificationService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
