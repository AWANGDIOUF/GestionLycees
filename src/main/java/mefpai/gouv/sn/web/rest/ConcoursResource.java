package mefpai.gouv.sn.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import mefpai.gouv.sn.domain.Concours;
import mefpai.gouv.sn.repository.ConcoursRepository;
import mefpai.gouv.sn.security.SecurityUtils;
import mefpai.gouv.sn.service.ConcoursService;
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
 * REST controller for managing {@link mefpai.gouv.sn.domain.Concours}.
 */
@RestController
@RequestMapping("/api")
public class ConcoursResource {

    private final Logger log = LoggerFactory.getLogger(ConcoursResource.class);

    private static final String ENTITY_NAME = "concours";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ConcoursService concoursService;

    private final ConcoursRepository concoursRepository;

    public ConcoursResource(ConcoursService concoursService, ConcoursRepository concoursRepository) {
        this.concoursService = concoursService;
        this.concoursRepository = concoursRepository;
    }

    /**
     * {@code POST  /concours} : Create a new concours.
     *
     * @param concours the concours to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new concours, or with status {@code 400 (Bad Request)} if the concours has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/concours")
    public ResponseEntity<Concours> createConcours(@RequestBody Concours concours) throws URISyntaxException {
        log.debug("REST request to save Concours : {}", concours);
        if (concours.getId() != null) {
            throw new BadRequestAlertException("A new concours cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Concours result = concoursService.save(concours);
        return ResponseEntity
            .created(new URI("/api/concours/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /concours/:id} : Updates an existing concours.
     *
     * @param id the id of the concours to save.
     * @param concours the concours to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated concours,
     * or with status {@code 400 (Bad Request)} if the concours is not valid,
     * or with status {@code 500 (Internal Server Error)} if the concours couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/concours/{id}")
    public ResponseEntity<Concours> updateConcours(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Concours concours
    ) throws URISyntaxException {
        log.debug("REST request to update Concours : {}, {}", id, concours);
        if (concours.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, concours.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!concoursRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Concours result = concoursService.save(concours);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, concours.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /concours/:id} : Partial updates given fields of an existing concours, field will ignore if it is null
     *
     * @param id the id of the concours to save.
     * @param concours the concours to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated concours,
     * or with status {@code 400 (Bad Request)} if the concours is not valid,
     * or with status {@code 404 (Not Found)} if the concours is not found,
     * or with status {@code 500 (Internal Server Error)} if the concours couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/concours/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Concours> partialUpdateConcours(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Concours concours
    ) throws URISyntaxException {
        log.debug("REST request to partial update Concours partially : {}, {}", id, concours);
        if (concours.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, concours.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!concoursRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Concours> result = concoursService.partialUpdate(concours);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, concours.getId().toString())
        );
    }

    /**
     * {@code GET  /concours} : get all the concours.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of concours in body.
     */
    @GetMapping("/concours")
    public ResponseEntity<List<Concours>> getAllConcours(Pageable pageable) {
        log.debug("REST request to get a page of Concours");
        if (SecurityUtils.hasCurrentUserThisAuthority("ROLE_ADMIN")) {
            Page<Concours> page = concoursService.findAll(pageable);
            HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
            return ResponseEntity.ok().headers(headers).body(page.getContent());
        }
        return ResponseEntity
            .ok()
            .headers(
                PaginationUtil.generatePaginationHttpHeaders(
                    ServletUriComponentsBuilder.fromCurrentRequest(),
                    (concoursService.findByUserIsCurrentUser(pageable))
                )
            )
            .body((concoursRepository.findByUserIsCurrentUser(pageable)).getContent());
    }

    /**
     * {@code GET  /concours/:id} : get the "id" concours.
     *
     * @param id the id of the concours to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the concours, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/concours/{id}")
    public ResponseEntity<Concours> getConcours(@PathVariable Long id) {
        log.debug("REST request to get Concours : {}", id);
        Optional<Concours> concours = concoursService.findOne(id);
        return ResponseUtil.wrapOrNotFound(concours);
    }

    /**
     * {@code DELETE  /concours/:id} : delete the "id" concours.
     *
     * @param id the id of the concours to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/concours/{id}")
    public ResponseEntity<Void> deleteConcours(@PathVariable Long id) {
        log.debug("REST request to delete Concours : {}", id);
        concoursService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
