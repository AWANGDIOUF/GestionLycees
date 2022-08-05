package mefpai.gouv.sn.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import mefpai.gouv.sn.domain.ReformeMatiere;
import mefpai.gouv.sn.repository.ReformeMatiereRepository;
import mefpai.gouv.sn.security.SecurityUtils;
import mefpai.gouv.sn.service.ReformeMatiereService;
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
 * REST controller for managing {@link mefpai.gouv.sn.domain.ReformeMatiere}.
 */
@RestController
@RequestMapping("/api")
public class ReformeMatiereResource {

    private final Logger log = LoggerFactory.getLogger(ReformeMatiereResource.class);

    private static final String ENTITY_NAME = "reformeMatiere";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ReformeMatiereService reformeMatiereService;

    private final ReformeMatiereRepository reformeMatiereRepository;

    public ReformeMatiereResource(ReformeMatiereService reformeMatiereService, ReformeMatiereRepository reformeMatiereRepository) {
        this.reformeMatiereService = reformeMatiereService;
        this.reformeMatiereRepository = reformeMatiereRepository;
    }

    /**
     * {@code POST  /reforme-matieres} : Create a new reformeMatiere.
     *
     * @param reformeMatiere the reformeMatiere to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new reformeMatiere, or with status {@code 400 (Bad Request)} if the reformeMatiere has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/reforme-matieres")
    public ResponseEntity<ReformeMatiere> createReformeMatiere(@RequestBody ReformeMatiere reformeMatiere) throws URISyntaxException {
        log.debug("REST request to save ReformeMatiere : {}", reformeMatiere);
        if (reformeMatiere.getId() != null) {
            throw new BadRequestAlertException("A new reformeMatiere cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ReformeMatiere result = reformeMatiereService.save(reformeMatiere);
        return ResponseEntity
            .created(new URI("/api/reforme-matieres/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /reforme-matieres/:id} : Updates an existing reformeMatiere.
     *
     * @param id the id of the reformeMatiere to save.
     * @param reformeMatiere the reformeMatiere to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated reformeMatiere,
     * or with status {@code 400 (Bad Request)} if the reformeMatiere is not valid,
     * or with status {@code 500 (Internal Server Error)} if the reformeMatiere couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/reforme-matieres/{id}")
    public ResponseEntity<ReformeMatiere> updateReformeMatiere(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ReformeMatiere reformeMatiere
    ) throws URISyntaxException {
        log.debug("REST request to update ReformeMatiere : {}, {}", id, reformeMatiere);
        if (reformeMatiere.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, reformeMatiere.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!reformeMatiereRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ReformeMatiere result = reformeMatiereService.save(reformeMatiere);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, reformeMatiere.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /reforme-matieres/:id} : Partial updates given fields of an existing reformeMatiere, field will ignore if it is null
     *
     * @param id the id of the reformeMatiere to save.
     * @param reformeMatiere the reformeMatiere to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated reformeMatiere,
     * or with status {@code 400 (Bad Request)} if the reformeMatiere is not valid,
     * or with status {@code 404 (Not Found)} if the reformeMatiere is not found,
     * or with status {@code 500 (Internal Server Error)} if the reformeMatiere couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/reforme-matieres/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<ReformeMatiere> partialUpdateReformeMatiere(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ReformeMatiere reformeMatiere
    ) throws URISyntaxException {
        log.debug("REST request to partial update ReformeMatiere partially : {}, {}", id, reformeMatiere);
        if (reformeMatiere.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, reformeMatiere.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!reformeMatiereRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ReformeMatiere> result = reformeMatiereService.partialUpdate(reformeMatiere);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, reformeMatiere.getId().toString())
        );
    }

    /**
     * {@code GET  /reforme-matieres} : get all the reformeMatieres.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of reformeMatieres in body.
     */
    @GetMapping("/reforme-matieres")
    public ResponseEntity<List<ReformeMatiere>> getAllReformeMatieres(Pageable pageable) {
        log.debug("REST request to get a page of ReformeMatieres");
        if (SecurityUtils.hasCurrentUserThisAuthority("ROLE_ADMIN")) {
            Page<ReformeMatiere> page = reformeMatiereService.findAll(pageable);
            HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
            return ResponseEntity.ok().headers(headers).body(page.getContent());
        }
        return ResponseEntity
            .ok()
            .headers(
                PaginationUtil.generatePaginationHttpHeaders(
                    ServletUriComponentsBuilder.fromCurrentRequest(),
                    (reformeMatiereService.findByUserIsCurrentUser(pageable))
                )
            )
            .body((reformeMatiereRepository.findByUserIsCurrentUser(pageable)).getContent());
    }

    /**
     * {@code GET  /reforme-matieres/:id} : get the "id" reformeMatiere.
     *
     * @param id the id of the reformeMatiere to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the reformeMatiere, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/reforme-matieres/{id}")
    public ResponseEntity<ReformeMatiere> getReformeMatiere(@PathVariable Long id) {
        log.debug("REST request to get ReformeMatiere : {}", id);
        Optional<ReformeMatiere> reformeMatiere = reformeMatiereService.findOne(id);
        return ResponseUtil.wrapOrNotFound(reformeMatiere);
    }

    /**
     * {@code DELETE  /reforme-matieres/:id} : delete the "id" reformeMatiere.
     *
     * @param id the id of the reformeMatiere to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/reforme-matieres/{id}")
    public ResponseEntity<Void> deleteReformeMatiere(@PathVariable Long id) {
        log.debug("REST request to delete ReformeMatiere : {}", id);
        reformeMatiereService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
